import { useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { faFolderOpen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useThemeTokens } from "../../libs/theme";
import { cn } from "../../libs/utils/cn";

import { Label } from "./Label";
import { Text } from "./Text";

/** A picked file — RN has no DOM `File`, so the picker's asset fields are used. */
export type PickedFile = { name: string; size: number; type: string; uri: string };

export type FileEntry = { file: PickedFile; error?: string };

export type UploadState = "idle" | "uploading" | "success" | "error";

export type FileInputMessages = {
  invalidSize: (limit: string) => string;
  invalidType: string;
  tooMany: (max: number) => string;
  uploadFailed: string;
  uploadSuccess: string;
};

export const DEFAULT_MESSAGES: FileInputMessages = {
  invalidSize: (limit) => `File exceeds ${limit} limit`,
  invalidType: "File type not allowed",
  tooMany: (max) => `Too many files — limit is ${max}`,
  uploadFailed: "Upload failed. Please try again.",
  uploadSuccess: "Files uploaded successfully.",
};

export type FileInputProps = {
  id: string;
  label?: string;
  hint?: string;
  multiple?: boolean;
  /** HTML-style accept pattern: extensions (`.png`), MIME (`image/png`) or wildcards (`image/*`). */
  accept?: string;
  maxSizeBytes?: number;
  maxFiles?: number;
  /** Explicit MIME whitelist (overrides loose `accept` matching). */
  allowedTypes?: string[];
  disabled?: boolean;
  required?: boolean;
  /** Accepted for API parity; RN has no form submission. */
  name?: string;
  /** Accepted for API parity; clipboard file paste has no RN equivalent. */
  enablePaste?: boolean;
  onFiles?: (files: PickedFile[]) => void;
  onUpload?: (files: PickedFile[]) => Promise<void>;
  uploadLabel?: string;
  className?: string;
  messages?: Partial<FileInputMessages>;
};

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** KuiReact's loose `accept` matcher: extension, exact MIME or `type/*` wildcard. */
export function matchesAccept(file: PickedFile, accept?: string): boolean {
  if (!accept) return true;
  const patterns = accept
    .split(",")
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean);
  if (patterns.length === 0) return true;
  const name = file.name.toLowerCase();
  const mime = (file.type || "").toLowerCase();
  return patterns.some((p) => {
    if (p.startsWith(".")) return name.endsWith(p);
    if (p.endsWith("/*")) return mime.startsWith(p.slice(0, -1));
    return mime === p;
  });
}

/** MIME filters for the system picker; extensions can't be expressed there, so they widen to any type (validation still applies). */
function pickerTypes(accept?: string): string[] {
  if (!accept) return ["*/*"];
  const patterns = accept.split(",").map((p) => p.trim()).filter(Boolean);
  return patterns.some((p) => p.startsWith(".")) ? ["*/*"] : patterns;
}

/**
 * Pixel-for-pixel with KuiReact's FileInput (modules/ui/FileInput): a
 * `rounded-lg border-2 border-dashed px-6 py-8` zone with a folder icon,
 * a list of selected files (`rounded-md border px-3 py-2`, errored ones in
 * error colours) with remove buttons, an optional upload button and
 * status messages. Validation (size, `allowedTypes`, `accept`, `maxFiles`)
 * is KuiReact's. RN adaptations: the zone opens the system document picker
 * (expo-document-picker) — phones have no drag-and-drop or clipboard file
 * paste, so the copy invites a tap instead.
 */
export function FileInput({
  id,
  label,
  hint,
  multiple = false,
  accept,
  maxSizeBytes,
  maxFiles,
  allowedTypes,
  disabled,
  required,
  onFiles,
  onUpload,
  uploadLabel = "Upload",
  className,
  messages,
}: FileInputProps) {
  const t = useThemeTokens();
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [globalError, setGlobalError] = useState("");

  const isDisabled = disabled || uploadState === "uploading";
  const msg: FileInputMessages = { ...DEFAULT_MESSAGES, ...messages };

  const validate = (file: PickedFile): string | undefined => {
    if (maxSizeBytes && file.size > maxSizeBytes) return msg.invalidSize(formatBytes(maxSizeBytes));
    if (allowedTypes && allowedTypes.length > 0 && !allowedTypes.includes(file.type)) return msg.invalidType;
    if (accept && !matchesAccept(file, accept)) return msg.invalidType;
    return undefined;
  };

  const addFiles = useCallback(
    (files: PickedFile[]) => {
      if (files.length === 0) return;
      const newEntries: FileEntry[] = files.map((file) => ({ file, error: validate(file) }));
      setEntries((prev) => {
        const combined = multiple ? [...prev, ...newEntries] : newEntries;
        if (maxFiles && combined.length > maxFiles) {
          setGlobalError(msg.tooMany(maxFiles));
          return combined.slice(0, maxFiles);
        }
        setGlobalError("");
        return combined;
      });
      const valid = newEntries.filter((e) => !e.error).map((e) => e.file);
      if (valid.length > 0) onFiles?.(valid);
      setUploadState("idle");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [multiple, maxFiles, maxSizeBytes, allowedTypes, accept, onFiles, messages],
  );

  async function browse() {
    if (isDisabled) return;
    const result = await DocumentPicker.getDocumentAsync({ multiple, type: pickerTypes(accept), copyToCacheDirectory: true });
    if (result.canceled) return;
    addFiles(result.assets.map((a) => ({ name: a.name, size: a.size ?? 0, type: a.mimeType ?? "", uri: a.uri })));
  }

  function removeEntry(i: number) {
    setEntries((prev) => prev.filter((_, idx) => idx !== i));
    setGlobalError("");
  }

  async function handleUpload() {
    if (!onUpload) return;
    const validFiles = entries.filter((e) => !e.error).map((e) => e.file);
    if (validFiles.length === 0) return;
    setUploadState("uploading");
    setErrorMsg("");
    try {
      await onUpload(validFiles);
      setUploadState("success");
      setEntries([]);
    } catch (e: unknown) {
      setUploadState("error");
      setErrorMsg(e instanceof Error ? e.message : msg.uploadFailed);
    }
  }

  const showError = globalError || (uploadState === "error" ? errorMsg : "");

  return (
    // KuiReact: "space-y-2"
    <View className={cn("gap-2", className)}>
      {label ? (
        <Label required={required} onPress={browse}>
          {label}
        </Label>
      ) : null}

      <Pressable
        testID={`fileinput-${id}`}
        onPress={browse}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel={label ? `${label}, browse files` : "Browse files"}
        accessibilityHint={hint}
        accessibilityState={{ disabled: Boolean(isDisabled) }}
        className={cn(
          "items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-surface-base px-6 py-8",
          "active:border-primary active:bg-primary-subtle",
          isDisabled && "opacity-50",
        )}
      >
        {/* KuiReact's `w-8 h-8` (Tailwind utilities layer) loses to FontAwesome's unlayered
            `.svg-inline--fa` box — 1.25em × 1em at the zone's 16px font — so the 576×512
            folder glyph is 18×16. */}
        <View className="h-4 w-5 items-center justify-center">
          <FontAwesomeIcon icon={faFolderOpen} size={18} color={t["text-disabled"]} />
        </View>
        <Text className="text-center text-sm text-text-secondary">
          Tap to <Text className="text-sm text-primary underline">browse</Text> files
        </Text>
        {hint ? <Text className="text-center text-xs text-text-disabled">{hint}</Text> : null}
      </Pressable>

      {entries.length > 0 ? (
        <View role="list" aria-label="Selected files" className="gap-1.5">
          {entries.map((entry, i) => (
            <View
              key={`${entry.file.uri}-${i}`}
              role="listitem"
              className={cn(
                "flex-row items-center gap-3 rounded-md border px-3 py-2",
                entry.error ? "border-error bg-error-subtle" : "border-border bg-surface-raised",
              )}
            >
              <Text numberOfLines={1} className={cn("min-w-0 flex-1 text-sm", entry.error ? "text-error-fg" : "text-text-primary")}>
                <Text className="font-medium">{entry.file.name}</Text>
                <Text className="text-xs text-text-secondary">{`  ${formatBytes(entry.file.size)}`}</Text>
              </Text>
              {entry.error ? <Text className="shrink-0 text-xs text-error">{entry.error}</Text> : null}
              <Pressable
                onPress={() => removeEntry(i)}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${entry.file.name}`}
                hitSlop={8}
                className="shrink-0 rounded active:opacity-70"
              >
                <FontAwesomeIcon icon={faXmark} size={12} color={entry.error ? t["error-fg"] : t["text-primary"]} />
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}

      {onUpload && entries.length > 0 ? (
        <View className="flex-row justify-end">
          <Pressable
            onPress={handleUpload}
            disabled={uploadState === "uploading"}
            accessibilityRole="button"
            className={cn("rounded-md bg-primary px-4 py-2 active:bg-primary-active", uploadState === "uploading" && "opacity-50")}
          >
            <Text className="text-sm font-medium text-primary-fg">{uploadState === "uploading" ? "Uploading…" : uploadLabel}</Text>
          </Pressable>
        </View>
      ) : null}

      {showError ? (
        <Text accessibilityRole="alert" className="text-sm text-error">
          {showError}
        </Text>
      ) : null}
      {uploadState === "success" && !showError ? (
        <Text accessibilityLiveRegion="polite" className="text-sm text-success-fg">
          {msg.uploadSuccess}
        </Text>
      ) : null}
    </View>
  );
}

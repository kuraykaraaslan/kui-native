# Feature matrix — FileInput

> KuiReact `modules/ui/FileInput/` (2 files, 391 LOC; 0 tests, 5 showcase variants) ↔ KuiNative `modules/ui/FileInput.tsx` (added 2026-09-22 in `6265440`, on `expo-document-picker`; 10 tests, 4 demos).
> **Status: PARITY_COMPLETE**

| Feature | KuiReact | KuiNative | Status |
| --- | --- | --- | --- |
| `id`, `label`, `hint`, `multiple`, `accept`, `maxSizeBytes`, `maxFiles`, `allowedTypes`, `disabled`, `required`, `onFiles`, `onUpload`, `uploadLabel` (default "Upload"), `className`, `messages` | ✓ | ✓ | Match |
| `name` | hidden form field | accepted, ignored | N/A (no form submission on RN) |
| `enablePaste` | clipboard file paste while focused | accepted, ignored | N/A (no clipboard file paste on RN) |
| File type | DOM `File` | `PickedFile` { name, size, type, uri } from the picker | Adapted |
| Picking | drag-and-drop zone + hidden `<input type="file">` behind a "browse" button | the whole zone opens the system document picker; `accept` MIME patterns become picker filters (extension patterns widen to any type; validation still applies) | Adapted |
| Zone | `rounded-lg border-2 border-dashed px-6 py-8`, folder icon, "Drag & drop files here, or browse", `border-primary bg-primary-subtle` while dragging | same box and icon; copy "Tap to browse files"; the drag colours show while pressed | Adapted (no drag and drop on phones) |
| Validation | size, `allowedTypes`, `accept`, `maxFiles`, KuiReact's default messages | same code and messages | Match |
| File list | `rounded-md border px-3 py-2`, errored rows in error colours, name + size, remove button | same | Match |
| Upload | `rounded-md bg-primary px-4 py-2` button, "Uploading…", success `role="status"` / error `role="alert"` | same; success as a polite live region | Match |
| Tests | 0 | 10 | Native-ahead |
| Showcase | Single file, Multiple files, With upload action, Paste from clipboard, Disabled | same titles and copy except Paste from clipboard | N/A (the paste demo has no RN equivalent) |

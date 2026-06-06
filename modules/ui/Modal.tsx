import type * as React from "react";
import { Modal as RNModal, Pressable, View } from "react-native";

import { cn } from "@/libs/utils/cn";

import { Text } from "./Text";

export type ModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function Modal({ visible, onClose, title, footer, children, className }: ModalProps) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      {/* Backdrop — rgba is the documented exception for raw color */}
      <Pressable
        onPress={onClose}
        className="flex-1 items-center justify-center px-6"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        {/* Inner Pressable captures the touch so taps on the card don't close the modal */}
        <Pressable
          onPress={() => {}}
          className={cn(
            "w-full max-w-md rounded-2xl border border-border bg-surface-base p-5",
            className,
          )}
        >
          {title ? (
            <Text variant="h3" className="mb-2">
              {title}
            </Text>
          ) : null}
          {children}
          {footer ? <View className="mt-4 flex-row justify-end gap-2">{footer}</View> : null}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

import { act, fireEvent, render, screen } from "@testing-library/react-native";
import * as DocumentPicker from "expo-document-picker";

import { FileInput, formatBytes, matchesAccept } from "./FileInput";

jest.mock("expo-document-picker", () => ({ getDocumentAsync: jest.fn() }));
const pick = DocumentPicker.getDocumentAsync as jest.Mock;

const asset = (name: string, size: number, mimeType: string) => ({ name, size, mimeType, uri: `file:///${name}` });

async function choose(...assets: ReturnType<typeof asset>[]) {
  pick.mockResolvedValueOnce({ canceled: false, assets });
  await act(async () => {
    fireEvent.press(screen.getByTestId("fileinput-f"));
  });
}

beforeEach(() => pick.mockReset());

describe("FileInput helpers", () => {
  it("formats byte sizes", () => {
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(2048)).toBe("2.0 KB");
    expect(formatBytes(3 * 1024 * 1024)).toBe("3.0 MB");
  });

  it("matches accept patterns by extension, MIME and wildcard", () => {
    const png = { name: "a.PNG", size: 1, type: "image/png", uri: "" };
    expect(matchesAccept(png, ".png")).toBe(true);
    expect(matchesAccept(png, "image/*")).toBe(true);
    expect(matchesAccept(png, "application/pdf, .pdf")).toBe(false);
    expect(matchesAccept(png, undefined)).toBe(true);
  });
});

describe("FileInput", () => {
  it("opens the picker with the accept MIME filters and lists picked files", async () => {
    const onFiles = jest.fn();
    await render(<FileInput id="f" label="Attachments" accept="image/*" multiple onFiles={onFiles} />);
    await choose(asset("photo.png", 2048, "image/png"));
    expect(pick).toHaveBeenCalledWith(expect.objectContaining({ multiple: true, type: ["image/*"] }));
    expect(screen.getByText("photo.png")).toBeTruthy();
    expect(onFiles).toHaveBeenCalledWith([expect.objectContaining({ name: "photo.png" })]);
  });

  it("a cancelled pick changes nothing", async () => {
    await render(<FileInput id="f" />);
    pick.mockResolvedValueOnce({ canceled: true, assets: null });
    await act(async () => {
      fireEvent.press(screen.getByTestId("fileinput-f"));
    });
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("flags oversize and disallowed files and keeps them out of onFiles", async () => {
    const onFiles = jest.fn();
    await render(<FileInput id="f" multiple maxSizeBytes={1024} accept=".pdf" onFiles={onFiles} />);
    await choose(asset("big.pdf", 4096, "application/pdf"), asset("x.png", 10, "image/png"), asset("ok.pdf", 10, "application/pdf"));
    expect(screen.getByText("File exceeds 1.0 KB limit")).toBeTruthy();
    expect(screen.getByText("File type not allowed")).toBeTruthy();
    expect(onFiles).toHaveBeenCalledWith([expect.objectContaining({ name: "ok.pdf" })]);
  });

  it("enforces maxFiles with an alert", async () => {
    await render(<FileInput id="f" multiple maxFiles={1} />);
    await choose(asset("a.txt", 1, "text/plain"), asset("b.txt", 1, "text/plain"));
    expect(screen.getByRole("alert")).toHaveTextContent("Too many files — limit is 1");
    expect(screen.queryByText("b.txt")).toBeNull();
  });

  it("single mode replaces the previous selection; remove drops an entry", async () => {
    await render(<FileInput id="f" />);
    await choose(asset("a.txt", 1, "text/plain"));
    await choose(asset("b.txt", 1, "text/plain"));
    expect(screen.queryByText("a.txt")).toBeNull();
    await fireEvent.press(screen.getByRole("button", { name: "Remove b.txt" }));
    expect(screen.queryByText("b.txt")).toBeNull();
  });

  it("uploads the valid files and shows success", async () => {
    const onUpload = jest.fn().mockResolvedValue(undefined);
    await render(<FileInput id="f" onUpload={onUpload} uploadLabel="Send" />);
    await choose(asset("a.txt", 1, "text/plain"));
    await act(async () => {
      fireEvent.press(screen.getByRole("button", { name: "Send" }));
    });
    expect(onUpload).toHaveBeenCalledWith([expect.objectContaining({ name: "a.txt" })]);
    expect(screen.getByText("Files uploaded successfully.")).toBeTruthy();
  });

  it("shows the upload error message", async () => {
    await render(<FileInput id="f" onUpload={() => Promise.reject(new Error("Server said no"))} />);
    await choose(asset("a.txt", 1, "text/plain"));
    await act(async () => {
      fireEvent.press(screen.getByRole("button", { name: "Upload" }));
    });
    expect(screen.getByRole("alert")).toHaveTextContent("Server said no");
  });

  it("disabled does not open the picker", async () => {
    await render(<FileInput id="f" disabled />);
    await act(async () => {
      fireEvent.press(screen.getByTestId("fileinput-f"));
    });
    expect(pick).not.toHaveBeenCalled();
  });
});

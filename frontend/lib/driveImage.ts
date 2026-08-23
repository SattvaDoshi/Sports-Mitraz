/**
 * Converts any Google Drive URL to the thumbnail API URL,
 * which works in browsers for publicly shared files without requiring sign-in.
 *
 * Supported input formats:
 *  - https://drive.google.com/file/d/FILE_ID/view?...
 *  - https://drive.google.com/uc?export=view&id=FILE_ID
 *  - https://lh3.googleusercontent.com/d/FILE_ID
 */
export function getDirectImageUrl(driveUrl: string | undefined | null): string {
  if (!driveUrl) return "/placeholder-image.jpg";

  // Skip non-drive URLs (e.g. local static assets)
  if (!driveUrl.includes("drive.google.com") && !driveUrl.includes("googleusercontent.com")) {
    return driveUrl;
  }

  let fileId = "";

  // Format 1: /file/d/FILE_ID/view
  const fileDMatch = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch?.[1]) {
    fileId = fileDMatch[1];
  }
  // Format 2: uc?export=view&id=FILE_ID or uc?id=FILE_ID
  else if (driveUrl.includes("drive.google.com/uc")) {
    try {
      const url = new URL(driveUrl);
      fileId = url.searchParams.get("id") || "";
    } catch {
      // ignore parse errors
    }
  }
  // Format 3: lh3.googleusercontent.com/d/FILE_ID
  else {
    const lh3Match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (lh3Match?.[1]) fileId = lh3Match[1];
  }

  if (fileId) {
    // Thumbnail API works for publicly shared files without browser sign-in
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
  }

  return driveUrl;
}


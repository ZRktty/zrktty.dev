# Design Specification: Blog Archive (Transmissions)

## 1. Page Purpose

The "Transmissions" archive is designed as a technical log. It prioritizes information density and chronological hierarchy over flashy imagery, mimicking an engineering terminal or a high-end architectural journal.

## 2. Layout Structure

- **Header Section:** Large display heading ("TRANSMISSIONS") using `VineMonoPro`. Subtext provides the "Terminal to Canvas" mission statement.
- **Filtering System:** Tonal, button-based filters (All Systems, Engineering, Tutorials, Thoughts) to allow quick sorting.
- **Article Feed:**
  - **Left Column:** Chronological metadata (Entry ID, Date, Category).
  - **Right Column:** Article Title (Large, bold) and a concise technical abstract.
- **Pagination:** A "Load Archive" button that maintains the tonal layering of the site.

## 3. Typography Patterns (Blog Specific)

- **Entry IDs:** `IBM Plex Mono`, small, uppercase, using primary blue for accents.
- **Article Titles:** `VineMonoPro`, large scale, tracking-tight.
- **Abstracts:** `IBM Plex Mono`, neutral grays for secondary hierarchy.

## 4. Interaction & Micro-copy

- **Micro-copy:** Use technical terminology like "Initializing...", "Loading Buffer...", "Source...", and "Transmission".
- **Hover states:** The entire article row should respond to the blending-mode cursor, highlighting the technical data as the user scrolls.

# MCP promt

## Stitch Instructions

Get the images and code for the following Stitch project's screens:

## Project

Title: Mono Freelance Portfolio
ID: 9337741311977947120

## Screens

1. Blog - Portfolio
   ID: aa067fd6f8d44cbc9394289d475c31b1

Use a utility like `curl -L` to download the hosted URLs.

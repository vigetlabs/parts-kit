# Development Plan: Resizable Iframe Implementation

This plan outlines the steps to implement a resizable width for the iframe in `src/app.tsx` using the `re-resizable` library.

## 1. Installation

- Install the `re-resizable` package.
  ```bash
  npm install re-resizable
  ```
  *(Note: Check if `npm` is the correct package manager for this project, looks like it is based on `package.json`)*

## 2. Component Implementation in `src/app.tsx`

### Imports
- Import the `Resizable` component from `re-resizable` at the top of `src/app.tsx`.

### State Management
- The manual mode is a new dropdown that is added to the list of activeScreenWidths. 
- When manual mode is selected, the iframe is resizable (otherwise it reverts to the widths defined in the utility bar store)
- The manaul width state will also controlled by this store. 
- The Resiable iframe will be a controlled component. 

### Wrapping the Iframe
- Locate the container currently wrapping the `iframe`:
  ```tsx
  <div
    className={cx('flex-grow', {
      'py-5': utilityStore.activeScreenSize !== ScreenSize.Desktop,
    })}
    style={{ maxWidth: activeScreenWidth }}
  >
    <iframe ... />
  </div>
  ```
- Replace or wrap the inner logic with `<Resizable>`.
- Since the goal is to resize the **width** only:
  - Configure the `enable` prop to allow resizing only on the horizontal axis (likely the **right** handle, or both left and right).
    ```tsx
    <Resizable
      enable={{ top:false, right:true, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
      // ...
    >
      <iframe ... />
    </Resizable>
    ```

### Configuration
- **Width Only**: Ensure `height` is set to auto or 100% and resizing is disabled for height.
- **Styling**:
  - Pass necessary classes to `className` of the `Resizable` component to match the existing layout (e.g., `flex`, centered alignment).
  - Ensure the `iframe` inside takes up 100% of the `Resizable` component's size (`width: 100%`, `height: 100%`).
- **Integration with Screen Size**:
  - If `utilityStore.activeScreenSize` is not `Desktop`, we might want to disable the resizable feature or bind the `size` prop to the `activeScreenWidth`.
  - For `Desktop` mode, allow free resizing.

## 3. Verification

- Verify that the iframe can be resized horizontally.
- Verify that the iframe **cannot** be resized vertically.
- Check behavior across different defined screen sizes in the utility bar (Mobile, Tablet, etc.) to ensure no conflict.


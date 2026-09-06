import type { Preview } from '@storybook/react-vite'
import "../app/app.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    backgrounds: {
      default: "warm",
      values: [
        { name: "warm", value: "#F4F1EC" },
        { name: "surface", value: "#FFFFFF" },
        { name: "bark", value: "#4A362E" },
      ],
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
    theme: {
      extend: {
        height: {
          'screen': '115vh',
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
        },
      },
    },
    daisyui: {
      themes: [
        {
          mnftheme: {
            accent: "#ffe2e5",
            neutral: "#3d4451",
            "base-100": "#ffffff",
          },
        },
      ],
    },
    plugins: [require("daisyui")],
  }
  
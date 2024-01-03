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
        colors: {
          colorButton: '#33B0CA', 
          colorHeading:"#EAEAEA",
          colorWhite:"#FAFAFA",
          colorBlack:"#252525",
        colorGray:'#616161' 
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
            tool:"#616161"
          },
        },
      ],
    },
    plugins: [require("daisyui")],
  }
  
module.exports = {
	content: [
	  "./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
	  extend: {
		  animation: {
			  'progress-bar' : 'progress 2s infinite',
		  },
		  keyframes: {
			progress : {
				'0%': {
					opacity: '0.3', 'margin-left':'-1000px',
				},
				'10%': { opacity: '1' },
				'100%': { opacity: '0', 'margin-left': '100%'},
			}
		  }
	  },
	},
	plugins: [
		require('@tailwindcss/forms'),
		// ...
	  ],
  }
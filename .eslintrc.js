// 区分生产环境、开发环境
const _mode = process.env.NODE_ENV || 'production';

module.exports = {
	"env": {
		"browser": true,
		"es6": true,
	},
	 "globals": {
    "$": true,
    "process": true,
    "dirname": true,
  },
	"extends": [
		"eslint:recommended","plugin:vue/essential"
	],
	"plugins": [
    "vue"
  ],
	"parserOptions": {
		"parser": "babel-eslint",
		"ecmaFeatures": {
			"jsx": true,
			"legacyDecorators": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"rules": {
		"no-console": "off",
		"no-debugger": _mode==='development' ? 0 : 2,
		"no-alert": _mode==='development' ? 0 : 2,
		"arrow-parens": 0,
		"generator-star-spacing": 0,
		"no-mixed-spaces-and-tabs": 0,
		"vue/require-v-for-key": 0,
		"semi": 0,
		"quotes": 0,
		"space-before-function-paren": 0,

	}
};
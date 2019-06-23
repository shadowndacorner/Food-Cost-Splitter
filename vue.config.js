module.exports = {
    devServer: {
		disableHostCheck: true,
		watchOptions: {
			poll: true,
			public: "192.168.1.2:8080"
		}
    },

    publicPath: '',

    pluginOptions: {
      cordovaPath: 'src-cordova'
    }
};

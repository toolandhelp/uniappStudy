const moduleAsset = {
    namespaced: true,
    state: () => ({
        info: {},
        pictures: [],
        attachments: [],
    }),
    mutations: {
        initAsset(state, { Asset, AssetPics, Attachments }) {
            state.info = Asset;
            state.pictures = AssetPics;
            state.attachments = Attachments;
        },
    },
    getters: {},
};

export default moduleAsset;
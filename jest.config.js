// jest.config.js
module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
        '^utils(.*)$': '<rootDir>/src/static/js/utils$1',

        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
        '(^|./)style': '<rootDir>/__mocks__/styleMock.js'
    },
    snapshotSerializers: ['enzyme-to-json/serializer'],
    coveragePathIgnorePatterns: [],
    testPathIgnorePatterns: ['/node_modules/']
};

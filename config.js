const environment = process.env.NODE_ENV;

const environmentConfigs = {};

if (environment === 'production') {
    // TODO: Modificar environmentConfigs según sea necesario
} else {
    // TODO: Modificar environmentConfigs según sea necesario
}

module.exports = {
    ...environmentConfigs,
    PORT: 3000,
    static: './public',
};
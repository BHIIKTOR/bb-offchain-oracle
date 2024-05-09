
const restify = require("restify");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const corsMiddleware = require("cors");
const { gravedigger } = require("./strategies/bluna");

const helpers = require(path.join(__dirname, 'helpers.js'));

const server = restify.createServer();

const cors = corsMiddleware({
    credentials: true,
    preflightMaxAge: 5,
    origin: function (origin, callback) {
        callback(null, origin);
    },
});
server.pre(cors);

server.use(
    restify.plugins.bodyParser({
        maxBodySize: 0,
        mapParams: true,
        mapFiles: false,
        overrideParams: false,
        hash: "sha1",
        rejectUnknown: true,
        requestBodyOnGet: false,
        reviver: undefined,
        maxFieldsSize: 1024 * 1024,
    })
);

fs.readdir("./strategies", (err, files) => {
    if (err) {
        throw err;
    }

    files.forEach(file => {
        const endpoint = require(path.join(__dirname, "strategies", file));

        server.get(`${endpoint.path}`, async (req, res) => {
            const out = {
                bondedAssetPrice: 0,
                gravedigger: [],
                token: {}
            }

            out.bondedAssetPrice = await helpers.getBondedAssetData(endpoint);

            out.gravedigger = await helpers.getGravediggerData(endpoint);

            // if (endpoint.token.contract.indexOf("factory") === -1) {
            //     out.token = await getTokenData(endpoint);
            // } else {
            //     out.token = out.gravedigger;
            // }

            res.json(helpers.processData(out, endpoint.token))
        })
    });

    server.listen(process.env.PORT, () => {
        console.log("%s listening at %s", server.name, server.url);
    });
})


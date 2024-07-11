import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

const sstConfig =  {
  config(_input) {
    return {
      name: "jiamingwang-portfolio",
      region: "ap-southeast-2",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site");

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;

module.exports = sstConfig;
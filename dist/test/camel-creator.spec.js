import { assert } from "chai";
import { CamelStable } from "../global/camel-stable.js";
import { CamelCreator } from "../management/camel-creation/camel-creator.js";
import { CamelPropertyGenerator } from "../management/camel-creation/camel-property-generator.js";
import { CamelSkillCreator } from "../management/camel-creation/camel-skill-creator.js";
import { LevelCurveFactory } from "../management/skills/level-curve-factory.js";
describe("Camel creation", () => {
    // Setup
    const camelPropertyGenerator = new CamelPropertyGenerator();
    const levelCurveFactor = new LevelCurveFactory();
    const camelSkillCreator = new CamelSkillCreator(levelCurveFactor);
    const camelCreator = new CamelCreator(camelPropertyGenerator, camelSkillCreator);
    const assertions = [];
    const stable = new CamelStable(camelCreator, camelPropertyGenerator);
    stable.populateStable();
    stable.camels.forEach((camel) => {
        const seedFromCamel = camelCreator.createSeedFromCamel(camel);
        const camelFromSeed = camelCreator.createCamelFromSeed(seedFromCamel);
        // We override properties we don't care about
        camelFromSeed.id = camel.id;
        camelFromSeed.temperament = camel.temperament;
        assertions.push({ actual: JSON.stringify(camelFromSeed), expected: JSON.stringify(camel), name: camel.name });
    });
    assertions.forEach(function (assertion) {
        it(`should decode encoded '${assertion.name}' camel`, () => {
            assert.equal(assertion.actual, assertion.expected);
        });
    });
    stable.camels.forEach((camel) => {
        it(`should encode '${camel.name}' to a string of length ${stable.camelInformationLength}`, () => {
            const encodedCamel = camelCreator.createSeedFromCamel(camel);
            console.log(encodedCamel);
            assert.equal(encodedCamel.length, stable.camelInformationLength);
        });
    });
});

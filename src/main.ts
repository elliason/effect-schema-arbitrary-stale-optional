import { Arbitrary, FastCheck, Schema } from "effect";
import { faker } from "@faker-js/faker";

const Struct = Schema.Struct({
  damageDate: Schema.optional(
    Schema.Date.annotations({
      arbitrary: () => (fc: any) =>
        fc.constant(null).map(() => {
          return faker.date.recent();
        }),
    })
  ),
  damageCause: Schema.optional(
    Schema.Literal("OTHER", "FLOOD", "STORM").annotations({
      arbitrary: () => (fc: any) =>
        fc
          .constant(null)
          .map(() => faker.helpers.arrayElement(["OTHER", "FLOOD", "STORM"])),
    })
  ),
  damageCauseDescription: Schema.optional(
    Schema.String.annotations({
      arbitrary: () => (fc: any) =>
        fc.constant(null).map(() => faker.lorem.sentence()),
    })
  ),
  otherDamageCauseDescription: Schema.optional(
    Schema.String.annotations({
      arbitrary: () => (fc: any) =>
        fc.constant(null).map(() => faker.lorem.sentence()),
    })
  ),
  description: Schema.optional(
    Schema.String.annotations({
      arbitrary: () => (fc: any) =>
        fc.constant(null).map(() => faker.lorem.sentence()),
    })
  ),
  hasMoreParticipants: Schema.optional(
    Schema.Boolean.annotations({
      arbitrary: () => (fc: any) =>
        fc.constant(null).map(() => faker.datatype.boolean()),
    })
  ),
  hasWitnesses: Schema.optional(
    Schema.Boolean.annotations({
      arbitrary: () => (fc: any) =>
        fc.constant(null).map(() => faker.datatype.boolean()),
    })
  ),
  referenceNumber: Schema.optional(
    Schema.String.annotations({
      arbitrary: () => (fc: any) =>
        fc.constant(null).map(() => faker.string.uuid()),
    })
  ),
  reportedToContin: Schema.optional(
    Schema.Date.annotations({
      arbitrary: () => (fc: any) =>
        fc.constant(null).map(() => faker.date.recent()),
    })
  ),
  reportedToPartner: Schema.optional(
    Schema.Date.annotations({
      arbitrary: () => (fc: any) =>
        fc.constant(null).map(() => faker.date.recent()),
    })
  ),
});

const required = Schema.required(Struct);
const arb = Arbitrary.make(required);
const exampleData = FastCheck.sample(arb, 1);

console.log(exampleData[0]);

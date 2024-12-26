import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventDate: { type: Date, required: true },
});

const Event = mongoose.model("Event", eventSchema);

async function createEvent() {
  try {
    const event = new Event({ eventDate: "" }); // Invalid date
    await event.save();
  } catch (err) {
    console.error(err.errors.eventDate.name, err.errors.eventDate.message); // "CastError"
    console.error(err.message); // "Cast to Date failed for value \"invalid-date\" at path \"eventDate\""
  }
}
createEvent();

// const userdata = mongoose.model("User", UserSchema);

export default eventSchema;

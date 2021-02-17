import yargs from "yargs";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

const argv = yargs(process.argv.slice(2))
  .alias("a", "action")
  .choices("a", ["list", "get", "remove", "add"]).argv;

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      console.log("List contacts was updating whith new contact");
      break;

    case "remove":
      removeContact(id);
      console.log("List contacts was updating");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

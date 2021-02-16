import * as fs from "fs/promises";
import path from "path";
import { v4 } from "uuid";

const contactsPath = path.join("./db", "/contacts.json");

// TODO: задокументировать каждую функцию
export async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return console.table(JSON.parse(contacts));
  } catch (err) {
    throw err;
  }
}

export async function getContactById(contactId) {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const currentContact = JSON.parse(contactsList).find(
      (contact) => contact.id == contactId
    );
    return console.log(await currentContact);
  } catch (err) {
    throw err;
  }
}

export async function removeContact(contactId) {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const updateContacts = JSON.parse(contactsList).filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(updateContacts), "utf8");
  } catch (err) {
    throw err;
  }
}

export async function addContact(contactName, contactEmail, contactPhone) {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const newContacts = [
      ...JSON.parse(contactsList),
      {
        id: v4(),
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
      },
    ];
    fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
  } catch (err) {
    throw err;
  }
}

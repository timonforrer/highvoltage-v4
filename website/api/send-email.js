import sg from '@sendgrid/mail';
import { toHTML } from "@portabletext/to-html";
import { toPlainText } from '@portabletext/toolkit';
import { form as formQuery } from '../src/lib/queries.js';
import { getSanityData } from '../src/lib/sanity.js';
import { replacer } from "../src/lib/utils.js";

const emailAddresses = {
  booker: 'info@timonforrer.ch',
  band: 'info@voltagearc.com'
}

export default async function (req, res) {

  sg.setApiKey(process.env.VA_SENDGRID_API_KEY);

  const {
    email,
    id,
    recipient,
    redirect,
  } = req.body;

  const {
    externalEmail,
    internalEmail
  } = (await getSanityData({ query: formQuery, params: {$id: id} }));

  let externalMessage, internalMessage;

  if (externalEmail) {
    externalMessage = {
      to: email,
      from: 'info@voltagearc.com',
      reply_to: emailAddresses[recipient],
      subject: replacer({ string: externalEmail.subject, data: req.body}),
      text: replacer({ string: toPlainText(externalEmail.body), data: req.body}),
      html: replacer({ string: toHTML(externalEmail.body), data: req.body}),
    }
  }

  if (internalEmail) {
    internalMessage = {
      to: emailAddresses[recipient],
      from: 'info@voltagearc.com',
      reply_to: email,
      subject: replacer({ string: internalEmail.subject, data: req.body}),
      text: replacer({ string: toPlainText(internalEmail.body), data: req.body}),
      // html: replacer({ string: toHTML(internalEmail.body), data: req.body}),
    }
  }

  // Send both messages in parallel using Promise.all()
  Promise.all([
      sg.send(externalMessage),
      sg.send(internalMessage)
    ])
    .then(() => res.redirect(302, redirect))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
}

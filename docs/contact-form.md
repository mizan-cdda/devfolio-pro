# Contact form

The form validates input in the browser, filters bots, and then delivers the message through one of
three providers. None of them needs a server or database of your own.

## Choosing a provider

| Provider | Setup | What visitors experience | Best for |
| --- | --- | --- | --- |
| `mailto` (sample default) | None | Their email app opens with the message filled in | Getting started, or if you prefer replies from your own inbox |
| `endpoint` (recommended) | Free account with a form service | Message sends in place, with a confirmation | Most portfolios |
| `web3forms` | Free access key, no account dashboard needed | Message sends in place, with a confirmation | Simple setup without a full account |

The button label changes to match: **Send message** for services, **Continue in email app** for
`mailto`. The form never claims to send something it doesn't.

### Formspree (or any compatible service)

1. Create a form at https://formspree.io and copy its endpoint, such as `https://formspree.io/f/abcdwxyz`.
2. In `config/site.ts`:

```ts
contact: {
  // ...
  provider: { type: 'endpoint', url: 'https://formspree.io/f/abcdwxyz', serviceName: 'Formspree' },
},
```

3. Deploy, send yourself a test message, and confirm it in the Formspree dashboard if asked.

The form sends JSON (`name`, `email`, `subject`, `topic`, `message`) with
`Accept: application/json` and treats any 2xx response as success. Basin, Getform, FormKeep and
similar services accept the same request; check their docs for the endpoint URL.

### Web3Forms

1. Get an access key at https://web3forms.com (it is emailed to you).
2. In `config/site.ts`:

```ts
provider: { type: 'web3forms', accessKey: 'your-access-key' },
```

The access key is designed to be public; it only allows sending to the address you registered.

### mailto

```ts
provider: { type: 'mailto' },
```

Messages go to `profile.email`. If a visitor has no email app configured, the confirmation offers a
plain email link as a fallback.

## Spam protection

Three layers work without a backend:

1. **Honeypot field.** A field named `website` is hidden from people and screen readers. Bots that
   fill in every field reveal themselves; their submission shows the normal confirmation but is
   never sent, so they learn nothing.
2. **Minimum fill time.** Submissions faster than `contact.minSecondsBeforeSubmit` (default 3
   seconds) are treated the same way. No human can fill in the form that fast.
3. **Content checks.** Messages with more than three links are rejected with a friendly error.

Form services add their own filtering on top. If spam still gets through, enable the provider's
extra protection (Formspree and Web3Forms both offer optional CAPTCHA and filtering settings).

## Validation and accessibility

- Name (2 to 80 characters), email format, topic and message (20 to 4,000 characters) are checked
  on submit, then again as each field is fixed.
- Errors appear next to each field, are linked with `aria-describedby`, and an alert announces how
  many fields need attention. Focus moves to the first invalid field.
- If delivery fails, the visitor's text is kept and a link offers to send it by email instead.

Change topics and limits in `src/lib/contact.ts`.

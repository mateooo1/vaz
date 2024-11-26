import type { MetaFunction } from '@remix-run/node';
import { PhotoIcon, UserCircleIcon, HomeIcon } from '@heroicons/react/24/solid'
import { Field, Label, Description, Fieldset, Legend  } from '~/components/fieldset'
import { Listbox, ListboxLabel, ListboxOption } from '~/components/listbox'
import { Radio, RadioField, RadioGroup } from '~/components/radio'
import { Checkbox, CheckboxField, CheckboxGroup } from '~/components/checkbox'
import { Input } from '~/components/input'
import { Textarea } from '~/components/textarea'
import { Text } from '~/components/text'
import { Button } from '~/components/button'

export const meta: MetaFunction = () => {
  return [
      { title: 'Settings' },
  ];
};

const pages = [
  { name: 'Settings', href: '#', current: true },
]

export default function Settings() {
  return (
    <form>
          <nav aria-label="Breadcrumb" className="flex mb-8">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-gray-300"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <a
                href={page.href}
                aria-current={page.current ? 'page' : undefined}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="janesmith"
                    autoComplete="username"
                    className="max-w-40"
                     />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                About
              </label>
              <div className="mt-2">
                <Textarea
                  id="about"
                  name="about"
                  rows={3}
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                <Button
                  type="button"
                  color="white"
                  >
                  Change
                </Button>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-zinc-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-zinc-600 focus-within:ring-offset-2 hover:text-zinc-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <Input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                   />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <Input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  />
              </div>
            </div>

            <div className="sm:col-span-3">
              <Field>
                <Label>Country</Label>
                <Listbox name="country" placeholder="Select country" className="max-w-36">
                  <ListboxOption value="US">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1fa-1f1f8.svg" alt="US Flag" width="24" className="inline mr-2" />
                      United States
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="CA">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1e8-1f1e6.svg" alt="Canada Flag" width="24" className="inline mr-2" />
                      Canada
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="GB">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1ec-1f1e7.svg" alt="UK Flag" width="24" className="inline mr-2" />
                      United Kingdom
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="FR">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1eb-1f1f7.svg" alt="France Flag" width="24" className="inline mr-2" />
                      France
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="DE">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1e9-1f1ea.svg" alt="Germany Flag" width="24" className="inline mr-2" />
                      Germany
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="IN">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1ee-1f1f3.svg" alt="India Flag" width="24" className="inline mr-2" />
                      India
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="BR">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1e7-1f1f7.svg" alt="Brazil Flag" width="24" className="inline mr-2" />
                      Brazil
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="JP">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1ef-1f1f5.svg" alt="Japan Flag" width="24" className="inline mr-2" />
                      Japan
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="AU">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1e6-1f1fa.svg" alt="Australia Flag" width="24" className="inline mr-2" />
                      Australia
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="IT">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1ee-1f1f9.svg" alt="Italy Flag" width="24" className="inline mr-2" />
                      Italy
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="MX">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1f2-1f1fd.svg" alt="Mexico Flag" width="24" className="inline mr-2" />
                      Mexico
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="ES">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1ea-1f1f8.svg" alt="Spain Flag" width="24" className="inline mr-2" />
                      Spain
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="CN">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1e8-1f1f3.svg" alt="China Flag" width="24" className="inline mr-2" />
                      China
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="RU">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1f7-1f1fa.svg" alt="Russia Flag" width="24" className="inline mr-2" />
                      Russia
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="ZA">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1ff-1f1e6.svg" alt="South Africa Flag" width="24" className="inline mr-2" />
                      South Africa
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="AR">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1e6-1f1f7.svg" alt="Argentina Flag" width="24" className="inline mr-2" />
                      Argentina
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="KR">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1f0-1f1f7.svg" alt="South Korea Flag" width="24" className="inline mr-2" />
                      South Korea
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="NG">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1f3-1f1ec.svg" alt="Nigeria Flag" width="24" className="inline mr-2" />
                      Nigeria
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="EG">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1ea-1f1ec.svg" alt="Egypt Flag" width="24" className="inline mr-2" />
                      Egypt
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="SE">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1f8-1f1ea.svg" alt="Sweden Flag" width="24" className="inline mr-2" />
                      Sweden
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="PK">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1f5-1f1f0.svg" alt="Pakistan Flag" width="24" className="inline mr-2" />
                      Pakistan
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="PH">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1f5-1f1ed.svg" alt="Philippines Flag" width="24" className="inline mr-2" />
                      Philippines
                    </ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="KE">
                    <ListboxLabel>
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1f0-1f1f7.svg" alt="Kenya Flag" width="24" className="inline mr-2" />
                      Kenya
                    </ListboxLabel>
                  </ListboxOption>
                </Listbox>
              </Field>

            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <Input
                  id="street-address"
                  name="street-address"
                  type="text"
                  autoComplete="street-address"
                  />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                City
              </label>
              <div className="mt-2">
                <Input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <Input
                  id="region"
                  name="region"
                  type="text"
                  autoComplete="address-level1"
                  />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <Input
                  id="postal-code"
                  name="postal-code"
                  type="text"
                  autoComplete="postal-code"
                  />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            We'll always let you know about important changes, but you pick what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
          <Fieldset>
      <Legend>By email</Legend>
      <Text>We'll always let you know about important changes, but
      you pick what else you want to hear about.</Text>
      <CheckboxGroup>
        <CheckboxField>
          <Checkbox name="email" value="comments" defaultChecked />
          <Label>Comments</Label>
          <Description>Get notified when someone posts a comment on your post.</Description>
        </CheckboxField>
        <CheckboxField>
          <Checkbox name="discoverability" value="allow_embedding" />
          <Label>Upvotes</Label>
          <Description>Get notified when someone upvotes your post.</Description>
        </CheckboxField>
      </CheckboxGroup>
    </Fieldset>
            <div>
      <Fieldset>
      <Legend>Push notifications</Legend>
      <Text>These are sent to your smartphone.</Text>
      <RadioGroup name="resale" defaultValue="all">
        <RadioField>
          <Radio value="all" />
          <Label>All notifications</Label>
          <Description>Get notifications for everything.</Description>
        </RadioField>
        <RadioField>
          <Radio value="only" />
          <Label>Necessary only</Label>
          <Description>Receive only critical updates.</Description>
        </RadioField>
        <RadioField>
          <Radio value="optout" />
          <Label>No notifications</Label>
          <Description>Opt-out of notifications.</Description>
        </RadioField>
      </RadioGroup>
    </Fieldset>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button type="button" plain>
          Cancel
        </Button>
        <Button
          type="submit"
          >
          Save
        </Button>
      </div>
    </form>
  )
}

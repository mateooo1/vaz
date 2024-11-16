import type { MetaFunction } from "@remix-run/node";
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { Text } from "~/components/text";

const profile = {
  name: 'matt',
  email: 'ricardo.cooper@example.com',
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCcvfWXLbyWhLfIdIqxLXmbgzY3OVT7FRsg&s',
  backgroundImage:
    'https://i.postimg.cc/PfLvgH86/knitted-fargo-poster-vvjnf7wpilqday9a.jpg',
  bio: "bio here",
}

export const meta: MetaFunction = () => [{ title: profile.name + " (u/" + profile.name + ") - Switzer" }];

export default function User() {
  return (
    <div className="sticky top-0 w-full z-50">
      <div>
        <img
          alt="Profile Background"
          src={profile.backgroundImage}
          className="rounded-lg h-32 w-full object-cover lg:h-48"
        />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              alt="Profile Avatar"
              src={profile.avatar}
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">{profile.name}</h1>
              <Text>Joined on November 14, 2024 • 1.5k posts • 120k karma</Text>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button
                type="button"
                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <EnvelopeIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                <span>Message</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <PhoneIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                <span>Call</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">{profile.name}</h1>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-medium text-gray-800">Bio</h3>
          <p className="text-gray-600 mt-2">{profile.bio}</p>
        </div>
        <div className="mt-6 flex space-x-4 text-sm text-gray-600">
          <Text className="flex items-center">
            <strong>Location:</strong>
            <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg/1f1ea-1f1f8.svg" width="20" height="20" className="ml-2 mr-2" />
            Spain
          </Text>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="mt-8 bg-white rounded-lg p-6">
        <div className="flex space-x-6 border-b pb-4">
          <button className="text-lg font-semibold text-gray-800">Posts</button>
          <button className="text-lg font-semibold text-gray-500 hover:text-gray-800">Comments</button>
          <button className="text-lg font-semibold text-gray-500 hover:text-gray-800">About</button>
        </div>

        {/* Posts Feed */}
        <div className="mt-6 space-y-6">
          {/* Post Example */}
          <div className="flex items-start space-x-4 p-4 border rounded-lg bg-gray-50">
            <div className="flex-shrink-0">
              <button className="text-gray-500 hover:text-blue-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20l-6-6h4V4h4v10h4l-6 6z"></path>
                </svg>
              </button>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-700">Post Title</h4>
              <p className="text-gray-600 text-sm">A short description or snippet from the post. This could be a preview of the content!</p>
              <div className="mt-3 flex space-x-3">
                <button className="text-gray-500 hover:text-red-500">Upvote</button>
                <button className="text-gray-500 hover:text-blue-500">Comment</button>
                <button className="text-gray-500 hover:text-green-500">Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
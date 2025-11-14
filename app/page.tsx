'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemGroup
} from "@/components/ui/item"
import { Folder, Share2, ShieldPlus } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='bg-white dark:bg-black flex flex-col md:flex-row items-center justify-evenly min-h-screen' >
      <div className="md:w-120 flex-col items-center justify-center space-y-2">
        <div>
          <p className='text-2xl font-light text-justify'><span className='text-[#E43651] font-semibold'>Drop Your Resume</span> is a free online storage platform to manage your Resume in one place.</p>
        </div>

        <div className='w-96'>
          <ItemGroup>
            <Item>
              <ItemMedia variant="icon" className='bg-[#E43651]'>
                <Folder strokeWidth={1} className='text-white' />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className='text-[#E43651] font-semibold'>Upload your File</ItemTitle>
                <ItemDescription className='font-light text-justify text-base leading-6' >
                  Upload your resume easily by dragging and dropping your file in one place.
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item>
              <ItemMedia variant="icon" className='bg-[#E43651]'>
                <Share2 strokeWidth={1} className='text-white' />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className='text-[#E43651] font-semibold'>Share to the World</ItemTitle>
                <ItemDescription className='font-light text-justify text-base leading-6'>
                  Each file uploaded contain a custom link and you can share your CV/Resume with anyone.
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item>
              <ItemMedia variant="icon" className='bg-[#E43651]'>
                <ShieldPlus strokeWidth={1} className='text-white' />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className='text-[#E43651] font-semibold'>Secure and Private</ItemTitle>
                <ItemDescription className='font-light text-justify text-base leading-6'>
                  Your files are stored securely with encryption and privacy measures in place.
                </ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </div>

        <div className='justify-self-center-safe'>
          <Link href="/upload">
            <Button className="bg-[#E43651] text-white hover:bg-[#c32c43] focus:ring-4 focus:ring-red-300 font-light">
              Get Started
            </Button>
          </Link>

        </div>
      </div>

      <div className="md:w-1/2 flex items-center justify-center shrink-0">
        <div>
          <Image
            src="/resume-vctr.svg"
            alt="Hero Image"
            width={700}
            height={700}
          />
        </div>
      </div>
    </div>
  )
}
"use client"

import React from 'react'
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import {IEvent} from "@/../../lib/database/models/event.model"
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from '@/components/shared/Checkout'

const CheckoutButton = ({ event }: { event: IEvent }) => {

  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string

  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {/* {cannot buy past event} */}
      {
        hasEventFinished ? (
          <p className='p-2 text-red-400'>Sorry, tickets are no longer available</p>
        ) : (
          <>
          <SignedOut>
            <Button asChild className='button rounded-full' size="lg">
              <Link href="/sign-in">
              Buy Ticket
              </Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId}/>
          </SignedIn>
          </>
      )}
    </div>
  )
}

export default CheckoutButton
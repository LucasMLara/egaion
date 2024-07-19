import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


interface IEditalCard {

}

export default function EditalCard() {
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Card className="size-64 cursor-pointer hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle>Edital: 0001/2024</CardTitle>
              <CardDescription>Data: 00/00/00</CardDescription>
            </CardHeader>
            <CardContent>
              loren ipsun loren ipsun loren ipsun loren ipsun loren
            </CardContent>
            {/* <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter> */}
          </Card>
        </DialogTrigger>
      <DialogContent className="h-2/5 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Detalhes do Edital:</DialogTitle>
          <DialogDescription className='font-ubuntu'>
            Descrição
          </DialogDescription>
        </DialogHeader>
        <div className='container'>
        lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun 
        </div>
        <DialogFooter>
          <Button type="submit" disabled className='bg-gradient-primary hover:shadow-md transition-all disabled:cursor-wait'>Se Inscrever no edital</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { ReactElement, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
const inter = Inter({ subsets: ['latin'] })
import { useState } from 'react'

export default function Home() {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])
  const [text, setText] = useState('X');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [result, setResult] = useState('O');
  const ChangeText = (idx: number) => {
    board[idx] = text;
    setBoard([...board]);
  }
  const checkResult = (idx: number) => {
    if (board[0] == board[idx] && board[4] == board[idx] && board[8] == board[idx]) {
      setResult(board[idx])
      setOpen(true)
    }
    if (board[2] == board[idx] && board[4] == board[idx] && board[6] == board[idx]) {
      setResult(board[idx])
      setOpen(true)
    }
    if (isVertical(idx).filter((x: any) => x === Number(x)).length === 1) {
      setResult(board[idx])
      setOpen(true)
    }
  }

  function arrIndexVertical(index: number) {
    return [index % 3, Math.floor(index / 3)];
  }
  function isVertical(index: number) {
    const [x, y] = arrIndexVertical(index);
    let isXMatched = true, isYMatched = true;
    for (let i = 0; i < 3; i++) {
      if (board[x + 3 * i] !== board[index]) {
        isXMatched = false;
      }
      if (board[y * 3 + i] !== board[index]) {
        isYMatched = false;
      }
    }
    return [isXMatched ? x : false, isYMatched ? y : false];
  }
  const clearBoard = () => {
    handleOpen()
    setBoard(['', '', '', '', '', '', '', '', ''])
  }
  return (
    <div className='h-screen bg-white flex justify-center items-center  px-5 py-5 overflow-auto '>
      <div className='max-h-full max-w-full h-[52rem] w-[48rem] text-black flex-col ' >
        <div className='flex w-full justify-center space-x-2'>
          <div className={`cursor-pointer border ${text === 'X' ? 'shadow-yellow-500' : ''} shadow-md shadow-pink-600 rounded-lg text-black md:px-5 md:py-2  px-2`} onClick={() => setText('X')}>X</div>
          <div className={`cursor-pointer border shadow-md ${text === 'O' ? 'shadow-yellow-500' : ''} shadow-pink-600 rounded-lg text-black md:px-5 md:py-2 px-2`} onClick={() => setText('O')}>O</div>
        </div>
        <div className='flex flex-wrap'>
          {
            board.map((x: string, index: number) => {
              return <div className='w-2/6  px-2 py-2' key={index}>
                <div className={`cursor-pointer border rounded-md h-[7rem] md:h-[240px] w-full  md:w-[240px] flex justify-center items-center shadow-lg shadow-blue-400
                hover:shadow-red-600 ${x === result ? 'shadow-purple-900' : ''}`} onClick={() => { ChangeText(index), checkResult(index) }}>
                  <p className='text-black text-[3rem]'>{x.toUpperCase()}</p>
                </div>
              </div>
            })
          }
        </div>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody divider className='text-center'>
          <label className='text-2xl'>{result}</label> Winner
        </DialogBody>
        <DialogFooter className='flex justify-center'>
          <Button variant="gradient" color="green" onClick={clearBoard}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

    </div>
  )
}


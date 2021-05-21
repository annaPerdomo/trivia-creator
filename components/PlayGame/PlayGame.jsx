import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'

export default function PlayGame({questions}) {
  return (
    <div>
      <h1>Why hello there</h1>
      <div>
        <ul>
          {questions.map(question => {
            return (
              <li>{question.content}</li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}



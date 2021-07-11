import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function CreateGroup() {
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  
  const createGroup = async () => {

  }
  return (
    <div>
      <label htmlFor="newGroup">Group Name: </label>
      <input
        type="text"
        name="newGroupName"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
      ></input>
      <button type="button" onClick={createGroup}>
        Create Group
      </button>
    </div>  
  )
}
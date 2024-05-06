"use client"
import React, {useEffect, useState} from 'react'

function Purchase({ searchParams }) {
    const [ model, setModel ] = useState()

    const id = searchParams.id
    console.log(id)

    useEffect(() => {
        const fetchModelData = async () => {
          try {
            const res = await fetch(`http://localhost:3000/api/carmodels/${id}`);
            if (!res.ok) {
              throw new Error('Failed to fetch model data');
            }
            const data = await res.json();
            console.log(data);
            setModel(data.model);
          } catch (error) {
            console.error('Error fetching model:', error);
          }
        };
    
        fetchModelData();
      }, [id]);


      if (!model) {
        return <div>Loading...</div>;
      }

  return (
    <div>
        <span>{model.model}</span>
    </div>
  )
}

export default Purchase
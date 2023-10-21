import React from 'react'
import './Cards.css'
import { CardsData } from '../../data/Data'
import Card from '../Card/Card'

const Cards = () => {
  return (
    <div>
      <h1>
        MyAlcoholCard
      </h1>
      <div className="Cards">
        {CardsData.map((card, id) => {
          return (
            <div className="parentContainer">

              <Card
                title={card.title}
                color={card.color}
                barValue={card.barValue}
                value={card.value}
                png={card.png}
                series={card.series}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Cards
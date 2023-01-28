
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function MainLayout() {
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  let [monthLength, setMonthLength] = useState(new Date().getMonth())
  let [totalDay, setTotalDay] = useState('')
  let [fullYear, setFullYear] = useState(new Date().getFullYear())
  let [monthStart, setMonthStart] = useState()
  let [currentDate, setCurrentDate] = useState(new Date().getDate())

  const getDays = () => {
    let lastDay = new Date(fullYear, monthLength + 1, 0)
    setTotalDay(lastDay.getDate())
    setFullYear(lastDay.getFullYear())
    let PreviousDays = new Date(fullYear, monthLength, 1).getDay()
    setMonthStart(PreviousDays)

  }

  useEffect(() => {
    getDays()
  }, [monthLength, fullYear])


  let monthForward = () => {
    if (monthLength === 11) {
      setMonthLength(0)
      setFullYear(fullYear + 1)
    }
    else {
      setMonthLength(monthLength + 1)
    }
  }

  let monthBackward = () => {
    if (monthLength === 0) {
      setMonthLength(11)
      setFullYear(fullYear - 1)
    }
    else {
      setMonthLength(monthLength - 1)
    }
  }


  let yearForward = () => {
    setFullYear(fullYear + 1)
  }

  let yearBackward = () => {
    setFullYear(fullYear - 1)
  }

  let all;
  {
    (() => {
      all = []
      for (let i = 1; i <= totalDay; i++) {
        let isToday ;
         if(currentDate === i && monthLength === new Date().getMonth() && fullYear === new Date().getFullYear()){ isToday = 'highlightedNumber' }else{isToday = ''}
        all.push({
          date: i,
          classname: isToday,
        })
      }
      
    })()
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <Box className="main" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box >
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 3 }}>
          <ion-icon name="chevron-back" onClick={yearBackward}></ion-icon>
          <ion-icon name="arrow-back-outline" onClick={monthBackward}></ion-icon>
          <Typography sx={{ fontSize: 30, color: 'white' }}>{MONTH[monthLength] + " " + fullYear}</Typography>
          <ion-icon name="arrow-forward-outline" onClick={monthForward}></ion-icon>
          <ion-icon name="chevron-forward" onClick={yearForward}></ion-icon>
        </Box>

        <Grid container>
          {DAYS.map((e, i) => (
            <Grid item xs={1.714285} key={i} sx={{ bgcolor: 'lightgrey', color: '#232425' }}>
              <Typography sx={{ textAlign: 'center', paddingY: 2, fontSize: 20, fontWeight: 'bold' }}>{e}</Typography>
            </Grid>
          ))}
          {Array.from({ length: monthStart }).map((_, index) => (
            <Grid item key={index} xs={1.714285}>
              <Typography sx={{ color: '#232425' }}>''</Typography>
            </Grid>
          ))}
          {all.map((e, i) => (
            <Grid item key={i} xs={1.714285}  className='hover'>
              <Typography className={e.classname} sx={{ textAlign: 'center', paddingY: 2, marginX: 1, fontSize: 20, color: 'white' }}>{e.date}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>

  </div>
  )
}

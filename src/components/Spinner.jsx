import {Circles} from 'react-loader-spinner'

const Spinner = ({message}) => {
  return (
      <div className='spinner'>
          <Circles color='#01bdd7' height={80} width={220} className='' />
          <p className=''>{message}</p>
    </div>
  )
}

export default Spinner
import { onConfirm } from 'react-confirm-pro';



//shuffling function to reshuffle questions and options
export const reShuffle = ( questions ) => {
    const reshuffled = questions.map( question =>  ({
        sort: Math.random(),
        value: question
    } ) )
        .sort( ( a, b ) => a.sort - b.sort ).map( question => question.value ) 
    // console.log(reshuffled)
      return reshuffled
}


export const onClickLight = (text, desc, onSubmit, id, delBtn) => {
    onConfirm({
      title: (
        <h3>
          {text}
        </h3>
      ),
      description: (
        <p style={{marginTop: '10px', marginBottom: '10px'}}>{desc}</p>
      ),
        onSubmit: () => {
          if(id) {
            onSubmit(id)
          } else {
            onSubmit()
          }
      },
      onCancel: () => {
        
        },
        btnSubmit: delBtn,
      type: 'dark'
    })
  };




import React from 'react';
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;




const NewWorker = () => {
    const [name, setName] = useState('')
    const [ci, setCi] = useState('')
    const [bornDate, setBornDate] = useState('')
    const [adress, setAdress] = useState('')
    const [cel, setCel] = useState('')
    const [tel, setTel] = useState('')
    const [mail, setMail] = useState('')
    const [altaBps, setAltaBps] = useState('')
    const [bajaBps, setBajaBps] = useState(null)
    const [carnetS, setCarnetS] = useState('')
    const [emergencyTel, setEmergencyTel] = useState('')

    const history = useHistory()

    const [pdf, setPdf] = useState()
    const [photo, setPhoto] = useState()


    const handleSubmit = (event) => {
        event.preventDefault();
      };


    const postNewWorker = () => {
    const newWorker = {
        name,
        ci,
        bornDate,
        adress,
        cel,
        tel,
        mail,
        altaBps,
        bajaBps,
        carnetS,
        emergencyTel
    }
    
    fetch('http://localhost:3333/workers/newWorker',{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem("jwt")
        },
        body: JSON.stringify(newWorker)
        }).then(function(respuesta) {
            return respuesta.json()
        }).then(function (res) {
            if (res.success === false) {
                alert (res.message);
            } else {
                alert (res.message); 
                setName('');
                setCi('');
                setBornDate('');
                setAdress('');
                setCel('');
                setMail('');
                setAltaBps('');
                setBajaBps('');
                setCarnetS('');
                setEmergencyTel('');        
            }
        })
    }

    const OpenPdf = () =>{
        const options = {
            cMapUrl: 'cmaps/',
            cMapPacked: true,
          };

        const filesObj = []

        console.log(pdf.length)

        if (pdf.length > 30){
            alert('No acepta más de 30 documentos.')
            history.go(0)
        }
        for (var i = 0; i < pdf.length ; i++){
            filesObj.push(
                <Document file={pdf[i]} options={options} key={i} className="pdf" > 
                    <Page pageNumber={1} width={100}/>
                </Document>
            )
            if (i > 5) {return}
        }
        
        return(
        <div className='pdfs'>
                {filesObj}
        </div>
            )
    }

    const handlePhoto = () => {
        const data = new FormData();
        data.append("file", photo);
       
        fetch("http://localhost:3333/workers/uploadPhoto", {
          method: "POST",
          body: data,
        })  
        .then(response => response.json())
        .then((res) => {       
            alert(res.message);
        });
    }
    
    const handlePdf = () => {
        const data = new FormData();
        for(let i = 0; i < pdf.length; i++){
            data.append("file", pdf[i]);
        }
       
        fetch("http://localhost:3333/workers/uploadPdfs", {
          method: "POST",
          body: data,
        })  
        .then(response => response.json())
        .then((res) => {       
            alert(res.message);
        });
    }

    return (
        <main>
            <br />
            <h1>Nuevo Operario:</h1>
            <br />
            <form method = 'POST' id='form-NewFumi' onSubmit={handleSubmit}>
                <span>Nombre y Appellido*:</span>
                <input type="text" value={name} placeholder="Nombre y Appellido" onChange={(e) => setName(e.target.value) }/>
                <br />
                <span>CI*:</span>
                <input type="text" value={ci} placeholder="CI" onChange={(e) => setCi(e.target.value) }/>
                <br />
                <span>Fecha de Nacimiento*:</span>
                <input type="date" value={bornDate} onChange={(e) => setBornDate(e.target.value) }/>
                <br />
                <span>Dirección*:</span>
                <input type="text" value={adress} placeholder="Dirección" onChange={(e) => setAdress(e.target.value) }/>
                <br />
                <span>Celular*:</span>
                <input type="text" value={cel} placeholder="Celular" onChange={(e) => setCel(e.target.value) }/>
                <br />
                <span>Teléfono:</span>
                <input type="text" value={tel} placeholder="Teléfono" onChange={(e) => setTel(e.target.value) }/>
                <br />
                <span>Mail*:</span>
                <input type="email" value={mail} placeholder="Mail" onChange={(e) => setMail(e.target.value) }/>  
                <br />
                <span>Alta BPS*:</span>
                <input type="date" value={altaBps} onChange={(e) => setAltaBps(e.target.value) }/>
                <br />
                <span>Baja BPS:</span>
                <input type="date" value={bajaBps} onChange={(e) => setBajaBps(e.target.value) }/>
                <br />
                <span>Carnet de Salud (vence)*: </span>
                <input type="date" value={carnetS} onChange={(e) => setCarnetS(e.target.value) }/>
                <br />
                <span>Capacitaciones:</span>
                <input type="file" multiple={true} accept=".pdf" onChange={(e) => setPdf(e.target.files)}/>
                <br />
                {pdf ? <OpenPdf/> : ''}
                <span>Foto:</span>
                <input type="file" accept="image/*"  onChange={(e) => setPhoto(e.target.files[0])}/>
                <br />
                {photo ? <img src={`${photo[0]}`}/> : ''}
                <span>Telefono de emergencia:</span>
                <input type="text" value={emergencyTel} placeholder="Telefono de emergencia" onChange={(e) => setEmergencyTel(e.target.value) }/>
                <br />
                <br />
                <br />
                <input type="submit" value="Ingresar" onClick={() => {
                    handlePhoto()
                    handlePdf()
                    postNewWorker()
                }}/>
            </form>
                <br />
                <br />
                <span>* Obligatorios</span>
                <br />
                <br />
        </main>
    )
}

export default NewWorker;
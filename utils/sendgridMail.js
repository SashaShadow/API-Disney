import "dotenv/config.js";
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const msg = (user) => {
    const readyToSend = {
        to: `${user.email}`, // Change to your recipient
        from: 'caballerosasha@hotmail.com', // Change to your verified sender
        subject: 'Bienvenido a Alkemy Disney',
        text: `Bienvenido ${user.nombre}, aquí podrás obtener datos de los personajes del mundo Disney`,
        html: `
        <h1>Bienvenido</h1>
        <p>¡Hola <strong>${user.nombre}</strong>!, mediante esta API podrás obtener datos de los personajes del mundo Disney.</p>
        <p>Esperamos que te sea de ayuda y cualquier comentario que tengas podés enviarselo al creador del sitio a
        este email: caballerosasha@hotmail.com.</p>
        <p>Podés tambien revisar la documentacion de la API en el siguiente link: </p>`,
    }
    return readyToSend;
}

export const sendMail = async (msg) => {
    console.log(msg);
    return sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}


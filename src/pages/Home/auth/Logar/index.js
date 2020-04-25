import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { MdOndemandVideo } from 'react-icons/md';
import { toast, Zoom } from 'react-toastify';

import { signInRequest, signFailure } from '~/store/modules/auth/actions';
import { Container, Button } from './estilos';
import api from '~/services/api';

export default function Logar() {
	const [ email, setEmail ] = useState('');
	const [ emailAntes, setEmailAntes ] = useState('');
	const [ senha, setSenha ] = useState('');
	const [ errorEmail, setErroEmail ] = useState(false);
	const dispatch = useDispatch();
	const loading = useSelector(((state) => state.auth.loading) || false);

	const useStyles = makeStyles({
		progress: {
			width: '100%',
			height: '5px',
			'& > * + *': {},
			borderRadius: 5
		}
	});

	useEffect(() => {
		if (loading) {
			dispatch(signFailure());
		}
	}, []);

	function errorEmailMsg() {
		toast.error('Não existe um usuário com esse email.', {
			transition: Zoom
		});
		setErroEmail(true);
	}

	function errorServidorMsg() {
		toast.error('Sem conexão com o servidor!', {
			transition: Zoom
		});
	}

	async function emailExist() {
		setEmailAntes(email);
		if (emailAntes !== email) {
			try {
				const input = document.querySelector('input');
				if (input.validity.valid) {
					const response = await api.get(`/usuarios/existe/${email}`);
					if (response.data) {
						setErroEmail(false);
					} else {
						setErroEmail(true);
						errorEmailMsg();
					}
				}
			} catch (error) {
				errorServidorMsg();
			}
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (!errorEmail) {
			try {
				dispatch(signInRequest(email, senha));
			} catch (err) {
				console.log(err);
			}
		} else {
			errorEmailMsg();
		}
	}

	const classes = useStyles();

	return (
		<Container>
			<header>
				<MdOndemandVideo color="#4265CE" fontSize={150} />
				<h2>Iniciar Sessão</h2>
			</header>
			<form onSubmit={handleSubmit}>
				<input
					required
					type="email"
					placeholder="Digite seu email"
					onChange={(event) => setEmail(event.target.value)}
					value={email}
					onBlur={emailExist}
					maxLength={100}
				/>

				<input
					required
					type="password"
					placeholder="Digite sua senha"
					id="senha"
					onChange={(event) => setSenha(event.target.value)}
					value={senha}
				/>

				<Button loading={loading} className="btn btn-primary btn-block" type="submit">
					Entrar
				</Button>
				{loading && <LinearProgress color="primary" className={classes.progress} />}
			</form>
		</Container>
	);
}

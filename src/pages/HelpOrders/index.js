import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import Modal from 'react-modal';
import Pagination from 'rc-pagination';

import Action from '~/components/Actions';
import List from '~/components/List';
import Input from '~/components/Input';

import api from '~/services/api';
import toast from '~/services/toast';
import { Container, ModalContent, StyledForm } from './styles';

export default function HelpOrdersList() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [choosed, setChoosed] = useState({});

  useEffect(() => {
    async function getHelpOrders() {
      try {
        setLoading(true);

        const response = await api.get('help-orders/pending', {
          params: { page },
        });

        setHelpOrders(response.data);
      } catch (err) {
        toast('Erro na listagem de pedidos de ajuda.', 'error');
      } finally {
        setLoading(false);
      }
    }

    getHelpOrders();
  }, [page]);

  function openModal(helpOrderId, helpOrderQuestion) {
    setChoosed({ id: helpOrderId, question: helpOrderQuestion });
    return setOpen(true);
  }

  function closeModal() {
    return setOpen(false);
  }

  async function sendAnswer(data) {
    try {
      await api.post(`help-orders/${choosed.id}/answer`, data);

      toast('Pedido de ajuda respondido com sucesso', 'success');
      return setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    } catch (err) {
      if (err.response.data.messageContent) {
        return toast(err.response.data.messageContent, 'error');
      }
      return toast(
        'Erro ao responder pedido de ajuda. Verifique os dados',
        'error'
      );
    }
  }

  return (
    <>
      <Container>
        <Helmet>
          <title> GymPoint | Pedidos de auxílio </title>
        </Helmet>
        <Action title="Pedidos de auxílio" />
        <Container>
          {loading && <p> Carregando </p>}
          {!loading && helpOrders.length > 0 ? (
            <List>
              <thead>
                <tr>
                  <th> Aluno </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {helpOrders.map(helpOrder => (
                  <tr key={helpOrder.id}>
                    <td>{helpOrder.student.name}</td>
                    <td className="actions">
                      <button
                        type="button"
                        className="blue"
                        onClick={() =>
                          openModal(helpOrder.id, helpOrder.question)
                        }
                      >
                        {' '}
                        Responder{' '}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </List>
          ) : (
            !loading && <p> Sem pedidos de auxílio no momento </p>
          )}
          <Pagination onChange={p => setPage(p)} current={page} total={50} />
        </Container>
      </Container>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Pedido de auxílio"
        ariaHideApp={false}
      >
        <ModalContent>
          {choosed.question ? (
            <>
              <div className="question-container">
                <h2> Pergunta do Aluno </h2>
                <p className="question">{choosed.question}</p>
              </div>
              <StyledForm onSubmit={sendAnswer} className="answer-form">
                <h2> Sua resposta </h2>
                <Input
                  id="answer"
                  name="answer"
                  placeholder="Resposta"
                  multiline
                />
                <button type="submit">Responder aluno</button>
              </StyledForm>{' '}
            </>
          ) : (
            <p> Carregando... </p>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

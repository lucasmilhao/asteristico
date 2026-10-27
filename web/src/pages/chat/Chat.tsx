import React, { useState } from "react";
import "./Chat.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import '@fontsource/poppins'; // Peso padrão (400)
import '@fontsource/poppins/600.css'; // Opcional: peso semi-bold
import '@fontsource/poppins/700.css'; // Opcional: peso bold


type Mensagem = {
    id: number;
    tipo: "user" | "assistant";
    texto: string;
};

function Chat() {
    const [prompt, setPrompt] = useState("");
    const [mensagens, setMensagens] = useState<Mensagem[]>([]);
    const [status, setStatus] = useState("idle");
    const [conversationId] = useState(() => crypto.randomUUID());

    async function enviarPrompt() {
        if (!prompt.trim()) return;

        const pergunta = prompt.trim();

        // Adiciona a pergunta imediatamente ao histórico
        setMensagens((anterior) => [
            ...anterior,
            {
                id: Date.now(),
                tipo: "user",
                texto: pergunta,
            },
        ]);

        setPrompt("");
        setStatus("thinking");

        try {
            const response = await fetch(
                `http://localhost:8080/ai?prompt=${encodeURIComponent(pergunta)}&conversationId=${conversationId}`
            );

            if (!response.ok) {
                throw new Error("Erro ao comunicar com a API");
            }

            if (!response.body) {
                throw new Error("Streaming não suportado");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            // Cria uma mensagem vazia para receber o streaming
            const idResposta = Date.now() + 1;

            setMensagens((anterior) => [
                ...anterior,
                {
                    id: idResposta,
                    tipo: "assistant",
                    texto: "",
                },
            ]);

            setStatus("writing");

            while (true) {
                const { value, done } = await reader.read();

                if (done) break;

                const texto = decoder.decode(value, {
                    stream: true,
                });

                // Atualiza somente a última resposta
                setMensagens((anterior) =>
                    anterior.map((mensagem) =>
                        mensagem.id === idResposta
                            ? {
                                ...mensagem,
                                texto: mensagem.texto + texto,
                            }
                            : mensagem
                    )
                );
            }
        } catch (error) {
            console.error(error);

            setMensagens((anterior) => [
                ...anterior,
                {
                    id: Date.now(),
                    tipo: "assistant",
                    texto: "Ocorreu um erro ao gerar a resposta.",
                },
            ]);
        } finally {
            setStatus("done");
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            enviarPrompt();
        }
    }

    return (
        <div className="chat-container">

            <main className="chat-messages">
                {mensagens.map((mensagem) => (
                    <div
                        key={mensagem.id}
                        className={`message ${mensagem.tipo === "user"
                            ? "user"
                            : "assistant"
                            }`}
                    >
                        <div className="message-content">
                            {mensagem.tipo === "assistant" ? (
                                <div className="markdown-content">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {mensagem.texto}
                                    </ReactMarkdown>

                                    {status === "writing" &&
                                        mensagem.id === mensagens[mensagens.length - 1]?.id && (
                                            <span className="cursor">▌</span>
                                        )}
                                </div>
                            ) : (
                                mensagem.texto
                            )}
                        </div>
                    </div>
                ))}

                {status === "thinking" && (
                    <div className="message assistant">
                        <div className="message-content">
                            <div className="typing">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <div className="chat-input-container">
                {status === "thinking" && (
                    <div className="status">
                        Pensando...
                    </div>
                )}

                {status === "writing" && (
                    <div className="status">
                        Gerando resposta...
                    </div>
                )}

                <div className="chat-input">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Pergunte alguma coisa..."
                        rows={1}
                    />

                    <button
                        className="send-button"
                        onClick={enviarPrompt}
                        disabled={
                            status === "thinking" ||
                            status === "writing"
                        }
                    >
                        ↑
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
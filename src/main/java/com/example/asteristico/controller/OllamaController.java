package com.example.asteristico.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;

@RestController 
@RequestMapping("/ai")
public class OllamaController {

    private final ChatClient chatClient;
    private final ChatMemory chatMemory;

    public OllamaController(ChatClient.Builder builder) {

        this.chatMemory = MessageWindowChatMemory.builder()
                        .maxMessages(20)
                        .build();

        this.chatClient = builder
            .defaultAdvisors(
                    MessageChatMemoryAdvisor.builder(chatMemory).build()
            )
            .build();
    }
    
    @GetMapping
    public Flux<String> getResposta(@RequestParam String prompt, @RequestParam String conversationId) {
        return chatClient.prompt().user(prompt).advisors(advisor -> advisor.param(ChatMemory.CONVERSATION_ID, conversationId)).stream().content();
    }

    @GetMapping("/moda")
    public ResponseEntity<ChatResponse> getModa(@RequestParam String prompt) {
        PromptTemplate template = new PromptTemplate("""
                Como especialista nas artes do audiovisual, gostaria de me aperfeiçoar
                em {area}, como posso fazer isso ainda estando na moda e sendo relevante?
                """);

        template.add("area", prompt);

        return ResponseEntity.ok(chatClient.prompt(template.create()).call().chatResponse());
    }

}

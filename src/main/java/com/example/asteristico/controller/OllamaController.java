package com.example.asteristico.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController 
@RequestMapping("/ai")
public class OllamaController {

    private final ChatClient chatClient;

    public OllamaController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }
    
    @GetMapping
    public ResponseEntity<ChatResponse> getResposta(@RequestParam String prompt) {
        return ResponseEntity.ok(chatClient.prompt(prompt).call().chatResponse());
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

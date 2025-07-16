package br.com.cinerecomenda.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Permite CORS para todos os endpoints
                .allowedOrigins("http://localhost:3000") // Permite requisições desta origem
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permite estes métodos
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
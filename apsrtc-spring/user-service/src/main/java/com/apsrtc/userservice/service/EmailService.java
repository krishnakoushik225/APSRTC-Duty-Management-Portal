package com.apsrtc.userservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final RetryTemplate mailRetryTemplate;

    @Value("${spring.mail.username}")
    private String fromEmail;

    /**
     * Synchronous + retried — password reset must surface failures to the caller.
     */
    public void sendOtpEmail(String to, String otp) {
        mailRetryTemplate.execute(context -> {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("Forgot Password OTP");
            message.setText("Your OTP for password reset is: " + otp);
            mailSender.send(message);
            return null;
        });
    }

    @Async
    public void sendLeaveMail(String toEmail, LocalDate fromDate, LocalDate toDate) {
        try {
            mailRetryTemplate.execute(ctx -> {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(fromEmail);
                message.setTo(toEmail);
                message.setSubject("Leave Request");
                message.setText("Your request for leave dated from " + fromDate + "to " + toDate
                        + " will be reviewed. We will inform you about the leave status.\\n \\n Thanks and Regards...");
                mailSender.send(message);
                return null;
            });
        } catch (Exception e) {
            log.error("sendLeaveMail failed", e);
        }
    }

    @Async
    public void sendLeaveStatusMail(String toEmail, String body, String subject) {
        try {
            mailRetryTemplate.execute(ctx -> {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(fromEmail);
                message.setTo(toEmail);
                message.setSubject(subject);
                message.setText(body);
                mailSender.send(message);
                return null;
            });
        } catch (Exception e) {
            log.error("sendLeaveStatusMail failed", e);
        }
    }
}

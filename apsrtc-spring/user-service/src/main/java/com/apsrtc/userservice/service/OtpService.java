package com.apsrtc.userservice.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class OtpService {

    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();

    public String generateOtp(String email) {
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);
        otpStorage.put(email, otp);
        return otp;
    }

    public boolean validateOtp(String email, String enteredOtp) {
        String storedOtp = otpStorage.get(email);
        if (storedOtp != null && storedOtp.equals(enteredOtp)) {
            log.info("OTP validated successfully!");
            otpStorage.remove(email);
            return true;
        } else {
            log.warn("OTP entered is incorrect!");
            return false;
        }
    }
}

package nus.shoppingcart_team2_sa60.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import nus.shoppingcart_team2_sa60.dto.AccountRequestDTO;
import nus.shoppingcart_team2_sa60.dto.AddressRequestDTO;
import nus.shoppingcart_team2_sa60.dto.CreditCardDTO;
import nus.shoppingcart_team2_sa60.dto.CustomerResponseDTO;
import nus.shoppingcart_team2_sa60.model.Customer;
import nus.shoppingcart_team2_sa60.service.AccountService;
import nus.shoppingcart_team2_sa60.utils.ErrorHandlingUtil;
import nus.shoppingcart_team2_sa60.validator.AccountValidator;
import nus.shoppingcart_team2_sa60.validator.CreditCardValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/api/account")
public class AccountController {
    @Autowired
    private AccountService aService;

    @Autowired
    private AccountValidator aValidator;

    @Autowired
    private CreditCardValidator ccValidator;

    @InitBinder
    public void initAccountBinder(WebDataBinder binder) {
        Object target = binder.getTarget();
        if (target == null) {
            return;
        }
        if (target instanceof AccountRequestDTO) {
            binder.addValidators(aValidator);
        }
        if (target instanceof CreditCardDTO) {
            binder.addValidators(ccValidator);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@Valid @RequestBody AccountRequestDTO customerAccount,
                                           BindingResult bindingResult,
                                           HttpSession session) {

        // Checks if AccountRequestDTO RequestBody is valid (name + email + password)
        // Custom validator if got email, MUST have name + password as well
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorHandlingUtil.handleBindingErrors(bindingResult));
        }

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer != null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer logged in already");

        // Saves new customer (proceed to AccountServiceImpl)
        Customer createdCustomer = aService.createAccount(customerAccount);

        // If customer exists already, does not create new customer and returns null;
        if (createdCustomer == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Customer exists already");

        return ResponseEntity.ok(new CustomerResponseDTO(createdCustomer));
    }


    @PutMapping("/edit/name")
    public ResponseEntity<?> editName(@Valid @RequestBody AccountRequestDTO customerAccount,
                                      BindingResult bindingResult,
                                      HttpSession session) {

        // Checks if AccountRequestDTO RequestBody is valid (name only)
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorHandlingUtil.handleBindingErrors(bindingResult));
        }

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer not logged in");

        // Update customer name
        Customer updatedCustomer = aService.editName(loggedInCustomer, customerAccount.getName());

        // If cannot find customer in database
        if (updatedCustomer == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Customer name not updated");

        return ResponseEntity.ok(new CustomerResponseDTO(updatedCustomer));
    }


    @PutMapping("/edit/password")
    public ResponseEntity<?> editPassword(@Valid @RequestBody AccountRequestDTO customerAccount,
                                          BindingResult bindingResult,
                                          HttpSession session) {

        // Checks if AccountRequestDTO RequestBody is valid (password + newPassword)
        // Custom validator if got new Password, MUST have current password as well
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorHandlingUtil.handleBindingErrors(bindingResult));
        }

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer not logged in");

        // Check existing password with customer's input
        Customer toUpdateCustomer = aService.checkPassword(loggedInCustomer, customerAccount.getPassword());
        if (toUpdateCustomer == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password entered");

        // Update customer password with new password
        Customer updatedCustomer = aService.editPassword(toUpdateCustomer, customerAccount.getNewPassword());
        return ResponseEntity.ok(new CustomerResponseDTO(updatedCustomer));
    }


    @PutMapping("/edit/address")
    public ResponseEntity<?> editAddress(@Valid @RequestBody AddressRequestDTO addressDTO,
                                         BindingResult bindingResult,
                                         HttpSession session) {

        // Checks if AddressRequestDTO RequestBody is valid (address)
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorHandlingUtil.handleBindingErrors(bindingResult));
        }

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer not logged in");

        // Update customer address
        Customer updatedCustomer = aService.editAddress(loggedInCustomer, addressDTO.toString());

        // If cannot find customer in database
        if (updatedCustomer == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Address not updated");

        return ResponseEntity.ok("Saved address successfully");
    }


    @PutMapping("/delete/address")
    public ResponseEntity<?> deleteAddress(HttpSession session) {

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer not logged in");

        // Delete address for logged in customer
        Customer deletedAddressCustomer = aService.deleteAddress(loggedInCustomer);

        // If cannot find customer in database
        if (deletedAddressCustomer == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Address not deleted");

        return ResponseEntity.ok("Deleted address successfully");
    }


    @GetMapping("/creditcard")
    public ResponseEntity<?> getCreditCard(HttpSession session) {

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer not logged in");

        CreditCardDTO creditCardDTO = aService.getCreditCard(loggedInCustomer);
        return ResponseEntity.ok(creditCardDTO);
    }

    @PutMapping("/edit/creditcard")
    public ResponseEntity<?> editCreditCard(@Valid @RequestBody CreditCardDTO creditCard,
                                            BindingResult bindingResult,
                                            HttpSession session) {

        // Checks if CreditCardDTO RequestBody is valid (all credit card info)
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorHandlingUtil.handleBindingErrors(bindingResult));
        }

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer not logged in");

        // Update customer credit card
        Customer updatedCustomer = aService.editCreditCard(loggedInCustomer, creditCard);

        // If cannot find customer in database
        if (updatedCustomer == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Credit Card not saved");

        return ResponseEntity.ok("Saved Credit Card successfully");
    }

    @PutMapping("/delete/creditcard")
    public ResponseEntity<?> deleteCreditCard(HttpSession session) {

        // Checks if session already has logged-in user.
        Customer loggedInCustomer = (Customer) session.getAttribute("customer");
        if (loggedInCustomer == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Customer not logged in");

        // Delete credit card information for logged in customer
        Customer deletedCreditCardCustomer = aService.deleteCreditCard(loggedInCustomer);

        // If cannot find customer in database
        if (deletedCreditCardCustomer == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Credit Card not deleted");

        return ResponseEntity.ok("Deleted Credit Card successfully");
    }
}

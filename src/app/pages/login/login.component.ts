import { Component, OnInit, ElementRef, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    test: Date = new Date();

    private authService = inject(AuthService);
    private router = inject(Router);

    checkFullPageBackgroundImage() {
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit() {
        this.checkFullPageBackgroundImage();

        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }

 

    public myForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    login() {

        const { email, password } = this.myForm.value;

        this.authService.login(email || '', password || '').subscribe({
            next: () => this.router.navigate(['/dashboard']),
            error: (message) => { Swal.fire('Error', message, 'error') }
        });
    }
}

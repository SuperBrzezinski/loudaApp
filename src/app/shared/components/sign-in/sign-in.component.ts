import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    public authService: AuthService,
    private formBuild: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.authService.SignIn(
      this.form.controls['email'].value,
      this.form.controls['password'].value
    );
  }

  private createForm() {
    this.form = this.formBuild.group({
      email: this.formBuild.control({ value: '', disabled: false }, [
        Validators.minLength(3),
        Validators.email,
        Validators.required,
      ]),
      password: this.formBuild.control({ value: '', disabled: false }, [
        Validators.minLength(5),
        Validators.required,
      ]),
    });
  }
}

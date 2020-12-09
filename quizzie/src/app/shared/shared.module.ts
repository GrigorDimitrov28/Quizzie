import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AsideComponent } from './aside/aside.component';
import { UsernameValidatorDirective } from './username-validator.directive';
import { SubmitOnValidDirective } from './dir.directive';
import { ShortenTextPipe } from './shorten-text.pipe';
import { TimeDiffPipe } from './time-diff.pipe';

@NgModule({
  declarations: [
    LoaderComponent,
    AsideComponent,
    UsernameValidatorDirective,
    SubmitOnValidDirective,
    ShortenTextPipe,
    TimeDiffPipe,
  ],
  imports: [CommonModule],
  exports: [
    LoaderComponent,
    AsideComponent,
    UsernameValidatorDirective,
    SubmitOnValidDirective,
    ShortenTextPipe,
    TimeDiffPipe,
  ],
})
export class SharedModule {}

<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SimpleMail extends Mailable
{
    use Queueable, SerializesModels;

    public $details;

    /**
     * Créez une nouvelle instance.
     *
     * @param array $details
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Construisez l'email.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject($this->details['subject'])
            ->view('emails.simple'); // Assurez-vous que la vue existe
    }
}

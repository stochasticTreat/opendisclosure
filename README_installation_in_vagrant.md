OpenDisclosure backend installation in Vagrant
=================

Scripts to build Hack Oregon's back end in a vagrant virtual machine.

To install the backend:

1) Virtual box and vagrant must be installed.

		See https://www.virtualbox.org/ for virtual box.
	
		See http://www.vagrantup.com/ for vagrant.
		
	-----------------------
	Important notes on vagrant usage:
	
	a) never run vagrant commands from your home machine as root. 
	ie, if you mistakenly run anything with the pattern 
	
		host machine prompt> sudo vagrant xxx
		
	you will probably need to read this: http://stackoverflow.com/questions/25652769/should-vagrant-require-sudo-for-each-command
	
	Running code as root from inside of the vagrant machine, ( ex: after >vagrant ssh and before ctrl-d ), is fine. 
	
	b) If you are re-installing the back end and wish to re-install the vagrant instance 
	(the first two commands in step 3), you need to first destroy the previously installed vagrant box
		> vagrant destroy
	Then remove the vagrant config file found in the installation directory. 
		> rm Vagrantfile

	-----------------------
	2) Copy this git repository to a folder on your computer and make that folder your working directory.
	
  3) Create a folder in which to install the Vagrant box with the backend
  
  4) Copy the file installBackEnd.sh from this git repository into the vagrant install folder just created
  
  5) Navigate to the Vagrant install folder
  
  6)Run these commands:
	host machine prompt> vagrant box add ubuntu14 https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-i386-vagrant-disk1.box
	host machine prompt> vagrant init ubuntu14
	host machine prompt> vagrant up
	host machine prompt> vagrant ssh
	#note: the previous command will take you into the vagrant virtual machine and give you a guest machine prompt
	guest machine prompt> cp /vagrant/installBackEnd.sh ~
	guest machine prompt> sudo chmod 755 ~/installBackEnd.sh
	guest machine prompt> ./installBackEnd.sh
	
	#insert step to alter vagrant config file
	
	guest machine prompt> foreman start

  7) Now open an internet browser window and enter this address to test the installation was successfull:
  #figure out what port...
  127.0.0.1:
	

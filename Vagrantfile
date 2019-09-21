# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.network :forwarded_port, guest: 80, host: 9100
    config.vm.provision :shell, path: "build/bootstrap.sh"
    config.vm.provision :shell, path: "build/prepare.sh", run: "always"

    # a private dhcp network is required for nfs to work (on windows hosts, at least)
    config.vm.network "private_network", type: "dhcp"

    # windows hosts - read here https://github.com/winnfsd/vagrant-winnfsd
    config.vm.synced_folder ".", "/vagrant", type: "nfs"

    config.vm.provider "virtualbox" do |vb|
        vb.memory = "256"
    end
end
